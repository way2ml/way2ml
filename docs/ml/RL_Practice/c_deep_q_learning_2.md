---
pageClass: ml-class
---
# DQN: 优化变得更完善

我们在上一节中使用DQN解决了过山车的问题，在这一节中我们对上一节的程序做一些优化。优化主要包含:

- 记录训练过程
- 保存训练模型
- 可视化训练过程

```python
from tensorflow.keras import models, layers, optimizers
import gym 
from collections import deque
import numpy as np 
import random
import pandas as pd 
import matplotlib.pyplot as plt 

class DQNSolver:
	"""docstring for DQNSolver"""
	def __init__(self, obervation_space, action_space):
		self.obervation_space = obervation_space
		self.action_space = action_space
		# 超参数
		self.lr = 0.001
		# 初始化replay记忆空间
		self.replay_size = 2000
		self.replay_queue = deque(maxlen=self.replay_size)
		self.batch_size = 64
		self.discount = 0.99
		self.step = 0
		self.update_freq = 400
		# 初始化NN
		self.model = self.create_model()
		# 初始化NN_target
		self.model_target = self.model

		
	def create_model(self):
		model = models.Sequential([
			layers.Dense(100, input_dim=self.obervation_space, activation='relu'),
			layers.Dense(self.action_space, activation='linear')
			])
		model.compile(loss='mean_squared_error', optimizer = optimizers.Adam(self.lr))
		return model 
			

	# epsilon random to get action
	def action(self, state, epsilon):
		# 这里有个疑问，这里用的正态随机 ???
		if np.random.uniform() < epsilon:
			return np.random.choice(range(self.action_space))
		else:
			# 这里为什么有[0] ???
			return np.argmax(self.model.predict(np.array([state]))[0])

	# Store transition
	def store(self, state, action, reward, next_state, done):
		self.replay_queue.append((state, action, reward, next_state, done))


	def sample_batch(self):
		if len(self.replay_queue) < self.replay_size:
			return None
		else:
			minibatch = random.sample(self.replay_queue, self.batch_size)
			return minibatch

	def train(self):
		minibatch = self.sample_batch()
		if minibatch == None:
			# print('Ooops, no batch')
			return
		
		current_states = np.array([transition[0] for transition in minibatch])
		next_states = np.array([transition[3] for transition in minibatch])

		# print(current_states,current_states.shape)
		current_qs_list = self.model.predict(current_states)
		future_qs_list = self.model_target.predict(next_states)

		X = []
		Y = []
		for index, (current_states,action,reward,new_current_states,done) in enumerate(minibatch):
			if done:
				new_q = reward
			else:
				max_future_q = np.max(future_qs_list[index])
				new_q = reward + self.discount * max_future_q
			current_qs = current_qs_list[index]
			# 用计算所得的新的q值去替换掉原来的对应这个动作的值?? 
			current_qs[action] = new_q

			X.append(current_states)
			Y.append(current_qs)

		# verbose 是干嘛用的??
		self.model.fit(np.array(X), np.array(Y), verbose =0)

		self.step += 1
		if self.step % self.update_freq == 0:
			# print('Target model updated')
			self.model_target.set_weights(self.model.get_weights())
			self.step = 0

	def save_model(self, file_path='MountainCar-v0-dqn.h5'):
		print('model saved')
		self.model.save(file_path)

def main(env_name):
	# 准备环境
	env = gym.make(env_name)
	observation_space = env.observation_space.shape[0]
	action_space = env.action_space.n 
	print(observation_space, action_space)
	dqn_solver = DQNSolver(observation_space, action_space)
	# 开始训练
	# 表示玩1000次游戏
	episodes = 1000
	# 每一轮游戏里面玩的步数
	steps = 200
	scores = []
	render = False
	record_every = 50

	col_names = ['Eps','Won','Cur','Min','Ave','Max']
	df = pd.DataFrame(columns=col_names)

	for episode in range(episodes):
		state = env.reset()
		score = 0
		done = False 
		for step in range(steps):
			if render:
				env.render()
			epsilon = 0.1
			action = dqn_solver.action(state=state, epsilon=epsilon)
			next_state, reward, done, _ = env.step(action)
			reward = 0 if (next_state[0] >=  env.goal_position) else -1
			score += reward
			dqn_solver.store(state, action, reward, next_state, done)
			state = next_state
			dqn_solver.train()
			if done:
				break

		win_flag = True if reward == 0 else False
		scores.append(score)	

		print('Eps:{} Won:{} Cur:{:.2f} Min:{:.2f} Anv:{:.2f} Max:{:.2f}'\
				.format(episode, win_flag, score, min(scores[-record_every:]), \
				        np.mean(scores[-record_every:]), max(scores[-record_every:])))
		
		if episode > 50:
			df.loc[len(df)] = [episode, win_flag, score, min(scores[-record_every:]),
							   np.mean(scores[-record_every:]), max(scores[-record_every:])]


		# if episode > 30:
		# 	if np.mean(scores[-30:]) > -170:
		# 		render =  True

		if episode > 50:
			if np.mean(scores[-50:]) > -170:
				dqn_solver.save_model()
				df.to_csv('Record.csv')

def plot_record(file_path):
	df = pd.read_csv(file_path)
	ax = plt.gca()
	df.plot(kind='line',x='Eps',y='Min',ax=ax)
	df.plot(kind='line',x='Eps',y='Cur',ax=ax)
	df.plot(kind='line',x='Eps',y='Ave',ax=ax)
	df.plot(kind='line',x='Eps',y='Max',ax=ax)
	plt.savefig('plot.png')
	plt.show()

if __name__ == "__main__":
	main(env_name="MountainCar-v0")
	plot_record('Record.csv')
```

这样我们将训练的过程记录了下来, 我得到这样一张图:
<p align='center'>
<img src='/images/ml/RL_Prt/plot.png'>
</p>

可以看到在大概前300个episode在总的奖励上都没有什么提升，但是在400个episode后性能就有了明显的提升。
另外我们还保存了神经网络的参数，也就是说我们下次可以直接使用训练好的神经网络去解决这个过山车的问题了。

下一节我将会直接调用训练好的武功秘籍，我们到时候见。

<Livere/>