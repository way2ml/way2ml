import numpy as np 
import matplotlib.pyplot as plt
import string 

# Three different distributions
distro_1 = np.array([1/6, 1/6, 1/6, 1/6, 1/6, 1/6])


distros = [distro_1]
colors = ['#9DC8C8', '#58C9B9', '#519D9E', '#D1B6E1']
num_distro = len(distros)

nums = [1,2,3,4,5,6]
point_labels = ['', '-10','-5','0','5','10']
empty_labels = ['', '', '', '', '', '']

plt.xkcd()

fig, ax = plt.subplots(1,1,figsize=(8,3))


ax.bar(nums, distros[0], color=colors[0]) 
ax.set_title('The distribution of random variable X')
ax.set_ylabel('Pr{X=x}')
ax.set_xlabel('x')

fig.tight_layout()
plt.savefig('./03_distribution.png')
plt.show()