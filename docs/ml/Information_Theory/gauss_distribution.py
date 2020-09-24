import numpy as np 
import matplotlib.pyplot as plt 

# Calculate the entropy of 1D 
# Gaussion distribution.
def cal_entropy(var):
    return 0.5*(1+np.log2(2*np.pi*var))

x = np.linspace(-5,7,200,endpoint=True)
mu_s = [0, 0, 0,- 2]
var_s = [0.2, 1, 5, 1]
num_plot = 4

plt.xkcd()
fig, ax = plt.subplots(1,1,figsize=(8,6))
print(ax)

ax.set_title('One-dimensional Gaussian distributions')
ax.set_xlabel('x') 
ax.set_ylabel('p(x)') 
for i in range(num_plot):
    p_x = (1/(2*np.pi*var_s[i])**0.5)*np.exp(-1*(x-mu_s[i])**2/(2*var_s[i]))
    H = cal_entropy(var_s[i])
    ax.plot(x,p_x,label='Mean={:.0f} Var={:.1f} H(X)={:.1f}'.format(mu_s[i],var_s[i], H))
plt.annotate('The entropy of a Gaussian \nrandom variable X is uniquely \ndetermined by the variance of X', xy=(1.1, 0.35))
plt.legend()
plt.savefig('./gussian_dis.png')
plt.show()