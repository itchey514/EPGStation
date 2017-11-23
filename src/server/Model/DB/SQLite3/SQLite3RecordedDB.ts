import * as DBSchema from '../DBSchema';
import { RecordedDB } from '../RecordedDB';

class SQLite3RecordedDB extends RecordedDB {
    /**
    * create table
    * @return Promise<void>
    */
    public create(): Promise<void> {
        let query = `create table if not exists ${ DBSchema.TableName.Recorded } (`
            + 'id integer primary key autoincrement, '
            + 'programId integer not null, '
            + 'channelId integer not null, '
            + 'channelType text not null, '
            + 'startAt integer not null, '
            + 'endAt integer not null, '
            + 'duration integer not null, '
            + 'name text not null, '
            + 'description text null, '
            + 'extended text null, '
            + 'genre1 integer null, '
            + 'genre2 integer null, '
            + 'videoType text null, '
            + 'videoResolution text null, '
            + 'videoStreamContent integer null, '
            + 'videoComponentType integer null, '
            + 'audioSamplingRate integer null, '
            + 'audioComponentType integer null, '
            + 'recPath text, '
            + 'ruleId int, '
            + 'thumbnailPath text, '
            + 'recording integer '
        + ');'

        return this.operator.runQuery(query);
    }

    /**
    * recording 状態を解除する
    * @param id: recorded id
    * @return Promise<void>
    */
    public removeRecording(id: number): Promise<void> {
        return this.operator.runQuery(`update ${ DBSchema.TableName.Recorded } set recording = 0 where id = ${ id }`);
    }

    /**
    * recording 状態をすべて解除する
    * @return Promise<void>
    */
    public removeAllRecording(): Promise<void> {
        return this.operator.runQuery(`update ${ DBSchema.TableName.Recorded } set recording = 0 where recording = 1`);
    }
}

export default SQLite3RecordedDB;
