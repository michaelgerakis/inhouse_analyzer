import {
  Avatar,
  Box,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";

export interface MatchupEntry {
  assists: number;
  champ: string;
  champ_level: number;
  cs: number;
  damage_dealt_to_objectives: number;
  damage_taken: number;
  deaths: number;
  first_blood_assist: boolean;
  first_blood_kill: boolean;
  gold_earned: number;
  heal: number;
  items: number[];
  jungle_minions_killed: number;
  killing_spree_streak: number;
  kills: number;
  overall_damage: number;
  performance_rank: number;
  performance_score: number;
  quadra_kills: number;
  result: string;
  role: string;
  sight_wards_bought: number;
  summoner: string;
  timeline: { participantId: number; lane: string; role: string };
  total_champ_damage: number;
  total_damage_taken: number;
  triple_kills: number;
  turret_kills: number;
  unreal_kills: number;
  vision: number;
  vision_wards_bought: number;
  wards_killed: number;
  win: boolean;
}

export type Matchup = [MatchupEntry, MatchupEntry];

export interface Match {
  winning_team_color: string;
  date: string;
  game_duration: string;
  performance_scores: {
    [summoner: string]: {
      score: number;
      rank: number;
    };
  };
  matchups: {
    BOTTOM: Matchup;
    JUNGLE: Matchup;
    MIDDLE: Matchup;
    TOP: Matchup;
    SUPPORT: Matchup;
  };
}

export interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const date = new Date(match.date).toLocaleDateString();
  const duration = match.game_duration
    .replace(" Minutes", "m")
    .replace(" Seconds", "s")
    .replace(" and ", " ");

  let maybeMvp: MatchupEntry;
  for (const [blue, red] of Object.values(match.matchups)) {
    if (blue.performance_rank === 1) {
      maybeMvp = blue;
      break;
    }

    if (red.performance_rank === 1) {
      maybeMvp = red;
      break;
    }
  }

  const mvp = maybeMvp!;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Box textAlign="center">
          <Typography variant="overline">{date}</Typography>
          <Divider />
          <Typography variant="caption">{duration}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">{mvp.summoner}</Typography>
          <Avatar src={"/images/champion_squares/" + mvp.champ + ".png"} />
          <Typography variant="overline">
            {mvp.kills + " / " + mvp.deaths + " / " + mvp.assists}
          </Typography>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>Hello, this is Patrick!</ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
