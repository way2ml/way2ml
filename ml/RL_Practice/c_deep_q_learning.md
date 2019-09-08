---
pageClass: ml-class
---
<!--
 * @Description: 
 * @Author: Jack Huang
 * @Github: https://github.com/HuangJiaLian
 * @Date: 2019-09-08 10:28:29
 * @LastEditors: Jack Huang
 * @LastEditTime: 2019-09-08 18:06:52
 -->
# Deep Q-Lerning

所谓　Deep Q-Learning　就是使用神经网络去找到从状态到动作的映射，可以理解为利用神经网络去模拟一个Q-Table。而使用神经网络的原因是神经网络
可以处理更为复杂的环境。


接下来使用DQN来解决过山车的问题。
```python
import gym
import numpy as np
import random
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import Adam

from collections import deque

class DQN:
    def __init__(self, env):
        self.env     = env
        # However, rather than training on the trials as they come in, 
        # we add them to memory and train on a random sample of that memory.
        self.memory  = deque(maxlen=2000)
        
        self.gamma = 0.85 # the future rewards depreciation
        self.epsilon = 1.0 # 尝试的比例
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.learning_rate = 0.005
        self.tau = .125

        # The fact that there are two separate models, 
        # one for doing predictions and one for tracking “target values” is 
        # definitely counter-intuitive. 
        # 
        # To be explicit, the role of the model (self.model) is to do 
        # the actual predictions on what action to take, 
        # and the target model (self.target_model) tracks 
        # what action we want our model to take.
        
        self.model = self.create_model()
        self.target_model = self.create_model()

    def create_model(self):
        model   = Sequential()
        state_shape  = self.env.observation_space.shape
        model.add(Dense(24, input_dim=state_shape[0], activation="relu"))
        #model.add(Dense(48, activation="relu"))
        model.add(Dense(24, activation="relu"))
        model.add(Dense(self.env.action_space.n))
        model.compile(loss="mean_squared_error",
            optimizer=Adam(lr=self.learning_rate))
        return model

    def act(self, state):
        self.epsilon *= self.epsilon_decay
        self.epsilon = max(self.epsilon_min, self.epsilon)
        if np.random.random() < self.epsilon:
            return self.env.action_space.sample()
        return np.argmax(self.model.predict(state)[0])

    # The training involves three main steps: remembering, learning, and reorienting goals.
    def remember(self, state, action, reward, new_state, done):
        self.memory.append([state, action, reward, new_state, done])

    # 这里就在训练神经网络了
    def replay(self):
        batch_size = 32
        if len(self.memory) < batch_size: 
            return
        # 从记忆里面选取batch_size条记忆
        samples = random.sample(self.memory, batch_size)
        for sample in samples:
            state, action, reward, new_state, done = sample
            target = self.target_model.predict(state)
            if done:
                # In the case we are at the end of the trials, 
                # there are no such future rewards, 
                # so the entire value of this state is just the current reward we received. 
                target[0][action] = reward
            else:
                # In a non-terminal state, however, we want to see what the maximum reward 
                # we would receive would be if we were able to take any possible action
                Q_future = max(self.target_model.predict(new_state)[0])
                target[0][action] = reward + Q_future * self.gamma
            self.model.fit(state, target, epochs=1, verbose=0)

    def target_train(self):
        weights = self.model.get_weights()
        target_weights = self.target_model.get_weights()
        for i in range(len(target_weights)):
            target_weights[i] = weights[i] * self.tau + target_weights[i] * (1 - self.tau)
        self.target_model.set_weights(target_weights)

    def save_model(self, fn):
        self.model.save(fn)

def main():
    env     = gym.make("MountainCar-v0")
    gamma   = 0.9
    epsilon = .95

    trials  = 1000
    trial_len = 500

    show_every = 10

    # updateTargetNetwork = 1000
    dqn_agent = DQN(env=env)
    steps = []
    for trial in range(trials):
        cur_state = env.reset().reshape(1,2)
        if (trial + 1)% show_every == 0:
            render = True
        else:
            render = False 
            
        for step in range(trial_len):
            action = dqn_agent.act(cur_state)
            new_state, reward, done, _ = env.step(action)
            if render:
                env.render() 
            # reward = reward if not done else -20
            new_state = new_state.reshape(1,2)
            dqn_agent.remember(cur_state, action, reward, new_state, done)
            
            dqn_agent.replay()       # internally iterates default (prediction) model
            dqn_agent.target_train() # iterates target model

            cur_state = new_state
            if done:
                break
        if step >= 199:
            print("Failed to complete in trial {}".format(trial))
            if step % 10 == 0:
                dqn_agent.save_model("trial-{}.model".format(trial))
        else:
            print("Completed in {} trials".format(trial))
            dqn_agent.save_model("success.model")
            # break

if __name__ == "__main__":
    main()
```

这里代码的效果并不是很理想，需要经过很长的训练时间才能成功一次。
还需要调整。具体的做法还在尝试当中。

<Livere/>