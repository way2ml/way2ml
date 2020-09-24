# #9DC8C8 #58C9B9 #519D9E #D1B6E1
import numpy as np 
import matplotlib.pyplot as plt

plt.figure(figsize=(8, 6))
plt.xkcd()
plt.title('The amount of information gained after observing the event')
plt.xlabel('The probability of the occurrence a event') 

plt.margins(x=0)
plt.margins(y=0)

x = np.linspace(0, 1, 100)
y = np.log2(1/x)

xrange = [0,1]
plt.plot(x, y, color = '#58C9B9')
plt.savefig('01_guess.png')
plt.show()