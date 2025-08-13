import { styled } from "styled-components";
import type { ITweet } from "./timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const TextDate = styled.p`
  margin: 15px 0px;
  font-size: 12px;
  color: #928f8f;
`;

export default function Tweet({ username, photo, tweet, createAt }: ITweet) {
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        <TextDate>
          {createAt
            ? new Date(createAt).toLocaleString("ko-KR", {
                timeZone: "Asia/Tashkent",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
              })
            : ""}
        </TextDate>
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
