/** source/controllers/blockscout.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import {Connection} from 'postgresql-client';
/*
interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}
*/
// getting a timestamp from blockscout
const getTimestamp = async (req: Request, res: Response, next: NextFunction) => {
  //const connection = new Connection('postgresql://postgres:blockscout_prod@10.128.0.31:5432/explorer');
  const envPort = parseInt(process.env.USER_LIMIT || '')
  const connection = new Connection({
    host: process.env.POSTGRES_HOST || '10.128.0.31', 
    port: Number.isInteger(envPort) ? envPort : 5432,
    user: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'blockscout_prod',
    database: process.env.POSTGRES_DATABASE || 'explorer',
    timezone: 'UTC'
  });
  await connection.connect();
  const qr = await connection.query("select (EXTRACT(EPOCH FROM (now() at time zone 'utc'))::int) - (EXTRACT(EPOCH FROM max(timestamp))::int) as last_timestamp from blocks");
  const rows = qr.rows;
  //console.log(result.fields);
  //console.log(qr.rows);
  
  await connection.close(); // Disconnect
  return res.status(200).json({
        message: 'ok'
  });
}


export default { getTimestamp };
