import numpy as np 
import matplotlib.pyplot as plt
import string 

# Three different distributions
distro_1 = np.array([0, 0, 0, 0, 1])
distro_2 = np.array([0.1, 0.25, 0.3, 0.25, 0.1])
distro_3 = np.full((5), 1/5)

distros = [distro_1,distro_2,distro_3]
colors = ['#9DC8C8', '#58C9B9', '#519D9E', '#D1B6E1']
num_distro = len(distros)

nums = [-2,-1,0,1,2]
point_labels = ['', '-10','-5','0','5','10']
empty_labels = ['', '', '', '', '', '']

plt.xkcd()

fig, axs = plt.subplots(3,1,figsize=(8,6))
axs = axs.flat

for i, ax in enumerate(axs):
    ax.bar(nums, distros[i], color=colors[i])
    ax.text(0.96, 0.80, string.ascii_uppercase[i], transform=ax.transAxes)   
    if i == 0:
        ax.set_title('Three diffrent distributions of a random variable X')
    
    if i == 2:
        ax.set_xlabel('Rating obtained')
    ax.set_ylabel('Probability')

    if i < 2:
        ax.set_xticklabels(empty_labels)
    else:
        ax.set_xticklabels(point_labels)

    if i == 0:
        H = (0 + 1*np.log2(distros[i][-1]))
    else:
        H = -1*np.sum(distros[i] * np.log2(distros[i]))
    # ax.text(0.05, 0.70, 'H(X) = {:.2f} bits'.format(H), transform=ax.transAxes)   
plt.savefig('./02_entropy_q.png')
# plt.savefig('./02_entropy.png')
plt.show()