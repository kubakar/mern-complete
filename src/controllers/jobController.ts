import { RequestHandler } from "express";
import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import { JobStatus, JobInterface } from "../utils/constants.js";
import day from "dayjs";

type SortType = "newest" | "oldest" | "az" | "za";
export const getAllJobs: RequestHandler<
  object,
  object,
  object,
  {
    status?: string;
    search?: string;
    type?: string;
    sort?: SortType;
    page?: number;
    limit?: number;
  }
> = async (req, res) => {
  console.log(req.user); // cookie / token will be attached automatically

  const { user, query } = req;
  const { search, status, type, sort, limit, page } = query;

  const queryObject = {
    createdBy: user.userId,
    ...(status && { status }), // "all" is not handled!
    ...(type && { type }),
    // search based on position OR company
    // ...(search && { position: { $regex: search, $options: "i" } }), // position only
    ...(search && {
      $or: [
        { position: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ],
    }), // case insensitive regex
  };

  const sortStruct: Record<SortType, string> = {
    newest: "-createdAt",
    oldest: "createdAt",
    az: "position",
    za: "-position",
  };

  const sortKey = sortStruct[sort ?? "newest"];

  // pagination is achieved with 'limit' & 'skip'
  const dbPage = Number(page) || 1;
  const dbLimit = Number(limit) || 10;
  const dbSkip = (dbPage - 1) * dbLimit; // used by mongoose

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(dbSkip)
    .limit(dbLimit);

  // add total jobs & amount of pages
  const totalJobs = await Job.countDocuments(queryObject); // similar to SQL's SELECT CALC ROWS ...
  const pages = Math.ceil(totalJobs / dbLimit);
  res
    .status(StatusCodes.OK)
    .json({ jobs, count: totalJobs, pages, currentPage: dbPage });
};

export const getSingleJob: RequestHandler<{ id: Types.ObjectId }> = async (
  req,
  res
) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json(job);
};

export const createJob: RequestHandler<object, object, JobInterface> = async (
  req,
  res
) => {
  const { user } = req;

  req.body.createdBy = user.userId; // attach userId (taken from auth middleware)
  const job = await Job.create(req.body); // only schema-defined values are applied

  res.status(StatusCodes.CREATED).json(job);
};

export const updateJob: RequestHandler<
  { id: Types.ObjectId },
  object,
  JobInterface
> = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

  res.status(StatusCodes.OK).json({ msg: "job updated", job: updatedJob });
};

export const deleteJob: RequestHandler<{ id: Types.ObjectId }> = async (
  req,
  res
) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};

export const showStats: RequestHandler<{ id: Types.ObjectId }> = async (
  req,
  res
) => {
  const { user } = req;

  // https://stackoverflow.com/questions/59321685/give-type-to-accumulator-with-array-reduce-typescript
  const defStats = Object.values(JobStatus).reduce<Record<string, number>>(
    (acc, curr) => {
      // const defStats = stringArray.reduce<Record<string, number>>((acc, curr) => {
      acc[curr] = 0;
      return acc;
    },
    {}
  ); // { interview: 0, declined: 0, pending: 0 }

  // Mongoose "autocasts" string values for ObjectId into their correct type in regular queries, but this does not happen in the aggregation pipeline
  const dbStats: {
    _id: string;
    count: number;
  }[] = await Job.aggregate([
    { $match: { createdBy: new Types.ObjectId(user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const stats = dbStats.reduce((acc, curr) => {
    const { _id: id, count } = curr;
    acc[id] = count;
    return acc;
  }, defStats);

  const dbMonthlyApplications: {
    _id: { year: number; month: number };
    count: number;
  }[] = await Job.aggregate([
    { $match: { createdBy: new Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" }, // mongo's get year of date
          year: { $year: "$createdAt" }, // mongo's get month of date
        }, // group by month & year
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": -1, // year
        "_id.month": -1, // month
      }, // start from newest
    },
    { $limit: 10 },
  ]);
  const monthlyApplications = dbMonthlyApplications.map((a) => {
    const {
      _id: { month, year },
      count,
    } = a;

    // const date = day(new Date(year, month)).format("MMM YYYY");
    const date = day()
      .month(month - 1)
      .year(year)
      .format("MMM YY");
    return { count, date };
  });

  console.log(monthlyApplications);
  res.status(StatusCodes.OK).json({ stats, applications: monthlyApplications });
};
