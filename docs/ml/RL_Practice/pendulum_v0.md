---
pageClass: ml-class
---

# Pendulum-v0

## Description
让无摩擦的倒立摆立起来。

## Observation

| Num  | Observation | Min  | Max  |
| ---- | ----------- | ---- | ---- |
| 0    | cos(theta)  | -1.0 | 1.0  |
| 1    | sin(theta)  | -1.0 | 1.0  |
| 2    | theta dot   | -8.0 | 8.0  |

## Action

| Num  | Action      | 	Min  | Max  |
| ---- | ----------- | ---- | ---- |
| 0    | Joint effort| -2.0 | 2.0  |


## Reward
$$
-(\theta^2 + 0.1*(\theta_{dt})^2 + 0.001*action^2)
$$


Theta is normalized between -pi and pi. Therefore, the lowest cost is `-(pi^2 + 0.1*8^2 + 0.001*2^2) = -16.2736044`, and the highest cost is `0`. In essence, the goal is to remain at zero angle (vertical), with the least rotational velocity, and the least effort.

## Starting State
Random angle from -pi to pi, and random velocity between -1 and 1

## Episode Termination
There is no specified termination. Adding a maximum number of steps might be a good idea.

NOTE: Your environment object could be wrapped by the TimeLimit wrapper, if created using the "gym.make" method. In that case it will terminate after 200 steps.

::: tip Tip
You should get an "AverageReturn" of around -100 to -150.
:::

[wiki](https://github.com/openai/gym/wiki/Pendulum-v0)