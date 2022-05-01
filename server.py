from socket import *
import random

serverName = 'localhost'
serverSocket = socket(AF_INET, SOCK_STREAM)
serverPort = 13456
serverSocket.bind((serverName, serverPort))
serverSocket.listen(1)
print('The server is ready to receive')

numberOfGuesses = 6
possibleWords = ["cat", "dog", "fish"]
currentWord = random.choice(possibleWords)
print(currentWord)
guessInProgress = ""
missedLetters = []
correctLetters = []
wonGame = False
numberOfRightWords = 0

# Establish the connection
print('Ready to serve...')
connectionSocket, addr = serverSocket.accept()

while True:
	try:
		if numberOfGuesses > 0 and wonGame is False:
			letterGuess = connectionSocket.recv(1024).decode("utf-8")
			print("The guessed letter is " + str(letterGuess))

			letterIndex = currentWord.find(str(letterGuess))

			if letterIndex != -1:
				print("LETTER IS IN WORD")
				correctLetters.append(letterGuess)
				numberOfRightWords += 1
			if letterIndex == -1:
				print("LETTER IS NOT IN WORD")
				missedLetters.append(letterGuess)
				numberOfGuesses = numberOfGuesses - 1
				connectionSocket.send(bytes(str(numberOfGuesses), "utf-8"))

			print("The correct letters thus far are ", correctLetters)
			for letter in range(len(currentWord)):
				if currentWord[letter] not in correctLetters:
					print("missing letters from word")
					break
				else:
					print("all letters found")
					print("YOU WIN GAME")
					wonGame = True
					break

		elif numberOfGuesses == 0:
			print("YOU LOSE GAME")
			connectionSocket.close()
			break

		elif wonGame:
			connectionSocket.close()
			break

	except KeyboardInterrupt:
		# Close client socket
		connectionSocket.close()

connectionSocket.close()
