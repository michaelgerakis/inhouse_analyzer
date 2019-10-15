import { Container } from "@material-ui/core";
import React from "react";
import { Match, MatchCard } from "./MatchCard";

export interface Data {
  match_history: Match[];
}

export interface HistoryProps {
  data: Data | null;
}

export function History({ data }: HistoryProps) {
  const matchCards = (data ? data.match_history : [])
    .slice(0, 20)
    .map((match, index) => <MatchCard key={index} match={match} />);

  return <Container maxWidth="xl">{matchCards}</Container>;
}
