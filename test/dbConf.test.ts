import mongoose from "mongoose";
import { DbConf } from "../src/conf/dbConf";
import { Index } from "../src";

       // Successfully connects to the database URI provided
       it('should successfully connect to the database URI provided', async () => {
        const dbConfMock = jest.spyOn(DbConf.prototype, 'connectDB');
        const index = new Index(3500);
        await index.connectDB();
        expect(dbConfMock).toHaveBeenCalled();
      });

   