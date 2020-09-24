---
pageClass: ml-class
---

# DQN: 使用武功秘籍

在上一节中我们得到了训练好的模型，保存在了`MountainCar-v0-dqn.h5`里面。这个文件就相当于一个专门解决过山车问题的
武功秘籍，有了它, 我们再也不用苦苦练习怎么样才能爬上山了。

接招吧!

```python
from tensorflow.keras import models, layers, optimizers
import gym 
import numpy as np 

class DQN:
	def __init__(self, obervation_space, action_space):
		self.obervation_space = obervation_space
		self.action_space = action_space
		self.model = self.load_model()

	def load_model(self):
		return models.load_model('./MountainCar-v0-dqn.h5',compile=False)
			

	def action(self, state):
		return np.argmax(self.model.predict(np.array([state]))[0])


def main(env_name):
	# 准备环境
	env = gym.make(env_name)
	observation_space = env.observation_space.shape[0]
	action_space = env.action_space.n 
	print(observation_space, action_space)
	dqn_solver = DQN(observation_space, action_space)
	print('已经拿到武功秘籍!')
	# 表示玩episodes次游戏
	episodes = 30
	# 每一轮游戏里面玩的步数
	steps = 200
	scores = []

	for episode in range(episodes):
		state = env.reset()
		score = 0
		done = False 
		for step in range(steps):
			env.render()
			action = dqn_solver.action(state=state)
			next_state, reward, done, _ = env.step(action)
			reward = 0 if (next_state[0] >=  env.goal_position) else -1
			score += reward
			state = next_state
			if done:
				break

		win_flag = True if reward == 0 else False
		scores.append(score)	

		print('Eps:{} Won:{} Cur:{:.2f} Min:{:.2f} Anv:{:.2f} Max:{:.2f}'\
				.format(episode, win_flag, score, min(scores[-50:]), \
				        np.mean(scores[-50:]), max(scores[-50:])))


if __name__ == "__main__":
	main(env_name="MountainCar-v0")
```

没错，就是这么厉害，我们看看视频感受一下吧! 

<video style="display:block; margin: 0 auto;" width="50%" controls>
<source src="https://raw.githubusercontent.com/HuangJiaLian/DataBase0/master/uPic/dqn.mp4" type="video/mp4">
</video>
    
<Livere/>