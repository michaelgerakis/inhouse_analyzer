import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";

export interface Match {
  winning_team_color: string;
  performance_scores: {
    [summoner: string]: {
      score: number;
      rank: number;
    };
  };
}

export interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const mvp = Object.entries(match.performance_scores).find(
    ([_, { rank }]) => rank === 1
  );

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Typography variant="h1">Winner: {match.winning_team_color}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography variant="body1">{mvp![0]}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
