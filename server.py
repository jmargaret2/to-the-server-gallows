from socket import *
import random

serverSocket = socket(AF_INET, SOCK_STREAM)

serverPort = 13456
serverSocket.bind(('', serverPort))
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

while True:
	# Establish the connection
	print('Ready to serve...')
	connectionSocket, addr = serverSocket.accept()

	try:
		if numberOfGuesses > 0 and wonGame == False:
			letterGuess = connectionSocket.recv(1024).decode("utf-8")
			print("The guessed letter is " + str(letterGuess))

			letterIndex = currentWord.find(str(letterGuess))

			if letterIndex != -1:
				print("LETTER IS IN WORD")
				correctLetters.append(letterGuess)
			if letterIndex == -1:
				print("LETTER IS NOT IN WORD")
				missedLetters.append(letterGuess)
				numberOfGuesses = numberOfGuesses - 1

			foundAllLetters = True
			for letter in range(len(currentWord)):
				if currentWord[letter] not in correctLetters:
					foundAllLetters = False
					break
			if foundAllLetters:
				wonGame = True

		elif numberOfGuesses <= 0:
			print("YOU LOSE GAME")
			connectionSocket.close()

		elif wonGame:
			print("YOU WIN GAME")
			connectionSocket.close()

	except IOError:
		# Close client socket
		connectionSocket.close()
