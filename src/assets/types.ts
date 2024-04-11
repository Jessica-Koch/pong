export enum PLAYER {
  ONE,
  TWO,
}

export type Position = {
  x: number;
  y: number;
};

export type Velocity = {
  vx: number;
  vy: number;
};

export type Ball = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  radius: number;
};

export type Paddle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Score = {
  player: number;
  opponent: number;
};
