import {
  Avatar,
  Box,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";

// tslint:disable: jsx-no-multiline-js

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

  const blueTeam = [
    match.matchups.TOP[0],
    match.matchups.JUNGLE[0],
    match.matchups.MIDDLE[0],
    match.matchups.BOTTOM[0],
    match.matchups.SUPPORT[0],
  ];

  const redTeam = [
    match.matchups.TOP[1],
    match.matchups.JUNGLE[1],
    match.matchups.MIDDLE[1],
    match.matchups.BOTTOM[1],
    match.matchups.SUPPORT[1],
  ];

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Box textAlign="center" marginRight="20px">
          <Typography variant="overline">{date}</Typography>
          <Divider />
          <Typography variant="caption">{duration}</Typography>
        </Box>
        <Grid container={true} spacing={2} alignItems="center">
          <Grid item={true}>
            <Avatar src={"/images/champion_squares/" + mvp.champ + ".png"} />
          </Grid>
          <Grid item={true}>
            <Grid container={true} direction="column" alignItems="center">
              <Grid item={true}>
                <Typography variant="caption">{mvp.summoner}</Typography>
              </Grid>
              <Grid item={true}>
                <Typography variant="overline">
                  {mvp.kills + " / " + mvp.deaths + " / " + mvp.assists}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container={true}>
          <Grid item={true} xs={5}>
            <Grid container={true} direction="column">
              {blueTeam.map(({ summoner, champ }) => (
                <Grid item={true} key={summoner}>
                  <Grid container={true} spacing={1} alignItems="center">
                    <Grid item={true}>
                      <Avatar
                        style={{ width: 16, height: 16 }}
                        src={"/images/champion_squares/" + champ + ".png"}
                      />
                    </Grid>
                    <Grid item={true}>
                      <Typography variant="caption">{summoner}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item={true} xs={1}>
            <Divider orientation="vertical" style={{ margin: "0 auto" }} />
          </Grid>
          <Grid item={true} xs={5}>
            <Grid container={true} direction="column">
              {redTeam.map(({ summoner, champ }) => (
                <Grid item={true} key={summoner}>
                  <Grid
                    container={true}
                    justify="flex-end"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item={true}>
                      <Typography variant="caption">{summoner}</Typography>
                    </Grid>
                    <Grid item={true}>
                      <Avatar
                        style={{ width: 16, height: 16 }}
                        src={"/images/champion_squares/" + champ + ".png"}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>Hello, this is Patrick!</ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
