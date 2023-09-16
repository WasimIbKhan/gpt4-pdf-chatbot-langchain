import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { createStore, combineReducers, applyMiddleware, Action, Dispatch } from "redux";
import { Provider } from "react-redux";
import ReduxThunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import authReducer from '../store/reducers/auth';

const MONGODB_URI = process.env.MONGODB_URI;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = MONGODB_URI;

const rootReducer = combineReducers({
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = Dispatch<Action<string>> & ThunkDispatch<RootState, unknown, Action<string>>;

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("chatbotDB").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  
  return (
    <Provider store={store}>
      <main className={inter.variable}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

export default MyApp;
