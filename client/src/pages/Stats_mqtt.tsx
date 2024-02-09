// mqtt
import mqtt from "mqtt";
import { useEffect, useState } from "react";

// MQTT
const clientId = `mqtt_react_123321`;
const host = "ws://broker.emqx.io:8083/mqtt";

const options = {
  keepalive: 60,
  clientId: clientId,
  // protocolId: "MQTT",
  // protocolVersion: protVer,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
};

console.log("Connecting mqtt client");

const Stats: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  useEffect(() => {
    const client = mqtt.connect(host, options);
    console.log(client);

    client.on("error", (err) => {
      console.log("Connection error: ", err);
      // client.end();
    });

    client.on("reconnect", () => {
      console.log("Reconnecting...");
    });

    client.on("connect", () => {
      console.log(`Client connected: ${clientId}`);
      // Subscribe
      client.subscribe("/test/mqtt_ws", { qos: 0 });
    });

    client.on("message", (topic, message) => {
      const payload = { topic, message: +message };
      setValue(payload.message);
      console.log(payload.message);
    });

    return () => {
      console.log("END");
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>Stats</h1>
      <hr />
      <div>{value}</div>
    </div>
  );
};
export default Stats;
