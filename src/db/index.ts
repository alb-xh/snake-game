import { initializeApp, FirebaseOptions } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { doc, setDoc, collection, limit, query, getDocs, orderBy } from "firebase/firestore"; 

export default class DB {
  static init (config: FirebaseOptions) {
    const app = initializeApp(config);
    const db = getFirestore(app);

    return new DB(db);
  }

  constructor (private db: Firestore) {}

  async getLeaderboard (topN = 10) {
    const leaderboardRef = collection(this.db, "leaderboard");
    const q = query(leaderboardRef, orderBy("score", "desc"), limit(topN));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      user: doc.id,
      score: doc.data().score
    }));
  }

  async getRanking (score: number, topN = 10): Promise<number | null> {
    if (score <= 0) return null;

    const leaderboard = await this.getLeaderboard(topN);
    
    const rank = leaderboard.findIndex(entry => entry.score < score);
    if (rank >= 0) return rank + 1;
        
    return leaderboard.length < topN ? leaderboard.length + 1 : null;
  }

  async submitScore (user: string, score: number) {
    const docRef = doc(this.db, "leaderboard", user);
    await setDoc(docRef, { score, timestamp: new Date() });
  }
}
