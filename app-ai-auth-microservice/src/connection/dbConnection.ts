import mongoose, { Connection } from 'mongoose';
class MongoDbConnection{

    private static instance: MongoDbConnection
    private db: any;

    private constructor(){

        this.establishConnection();
    }

    static getInstanceDBConnection(): MongoDbConnection {
        if(!this.instance){
            MongoDbConnection.instance = new MongoDbConnection();
        }
        return MongoDbConnection.instance;
    }
     
    private establishConnection(): void{
        mongoose.connect('mongodb://0.0.0.0:27017/OpenAi', {
            serverSelectionTimeoutMS: 50000
        }).then( () => {
            this.db = mongoose.connection.collection('Users');
            console.log('Connected to MongoDB');
        }).catch( (error) => {
            console.log(error);
        });

        if(this.db){
            this.db.on('error' , (err: Error)=> {
                console.log(err);
            });
    
            this.db.on('disconected' , ()=> {
                console.log('MongoDb Disconected');
            })
        }
    }
};

export default MongoDbConnection.getInstanceDBConnection();
