import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Model, Schema, Types, model } from "mongoose";

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  role: string;
  lastName?: string;
  location?: string;
}

interface UserInterfaceDocument extends UserInterface {
  _id?: Types.ObjectId;
}

// Put all user instance methods in this interface:
interface UserInterfaceMethods {
  test: () => boolean;
  createJWT: () => string;
  comparePassword: (pass: string) => Promise<boolean>;
}

// Create a new Model type that knows about UserInterfaceMethods
type UserModel = Model<UserInterface, object, UserInterfaceMethods>;

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 20,
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    // unique: true, //not a validator!

    // custom validator from mongoose
    //   validate: {
    //     validator: (v: string) => validator.isEmail(v),
    //     message: "Please provide a valid email",
    //   },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false, // will be not given back in response when queries are issued
    // BUT will be still given back on 'user.create()'
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "Def. Surname",
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "My City",
  },
  // new
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// https://mongoosejs.com/docs/middleware.html
// mongoose middleware (pre and post hooks)
// 'save' is not triggered but every method! (eg. 'findOneAndUpate' will not trigger that hook)
// is triggered on .create() method
UserSchema.pre("save", async function () {
  // trigger this only when password is given!
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // password hashing
  }
});

// methods
const comparePassword: UserInterfaceMethods["comparePassword"] =
  async function (this: UserInterfaceDocument, inputPassword) {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
  };

const test: UserInterfaceMethods["test"] = function (
  this: UserInterfaceDocument
) {
  console.log(this._id);
  return true;
};

const createJWT: UserInterfaceMethods["createJWT"] = function (
  this: UserInterfaceDocument
) {
  // _id will be accessible on the user instance
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};

UserSchema.method("test", test);
UserSchema.method("comparePassword", comparePassword);
UserSchema.method("createJWT", createJWT);

// export default model("User", UserSchema);
export default model<UserInterface, UserModel>("User", UserSchema); // 'UserModel' is passed to have methods in the instance
