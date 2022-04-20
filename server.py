from socket import *
import random

serverSocket = socket(AF_INET, SOCK_STREAM)

serverPort = 12000
serverSocket.bind(('', serverPort))
serverSocket.listen(1)
print('The server is ready to receive')

numberOfGuesses = 6
possibleWords = ["cat", "dog", "fish"]
currentWord = random.choice(possibleWords)
print(currentWord)

while True:
	# Establish the connection
	print('Ready to serve...')
	connectionSocket, addr = serverSocket.accept()

	try:
		letterGuess = connectionSocket.recv(1024)
		letterIndex = currentWord.find(letterGuess)

		if letterGuess != -1:
			print("LETTER IS IN WORD")
			# SHOW LETTER ON SCREEN HERE
		if letterIndex == -1:
				print("LETTER IS NOT IN WORD")
				numberOfGuesses = numberOfGuesses - 1
				connectionSocket.close()
	except IOError:
		# Close client socket
		connectionSocket.close()
