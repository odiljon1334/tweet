import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import type { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const Text = styled.p`
  text-align: center;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.5);
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createAt", "desc"),
        limit(25)
      );
      /* const spanshot = await getDocs(tweetsQuery);
        const tweets = spanshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        }); */
      unsubscribe = await onSnapshot(tweetsQuery, snapshot => {
        const tweets = snapshot.docs.map(doc => {
          const { tweet, createAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createAt: createAt?.toMillis ? createAt.toMillis() : null,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setTweet(tweets);
      });
    };
    console.log("Fetching tweets...");
    fetchTweets();
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweets.length === 0 ? <Text>No Tweets Yet!</Text> : null}
      {tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
