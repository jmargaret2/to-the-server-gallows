from socket import *
#
serverName = '140.103.93.138'  # put IP address
serverPort = 12000
#

clientSocket = socket(AF_INET, SOCK_DGRAM)

# hangman game starts here
import sys

isPlaying = True
lettersGuessed = ''
currentGuess = ''
numGuesses = 6
isRight = False
try:
	while numGuesses != 0 and isRight == False:
		numGuesses -= 1
		try:
			currentGuess = str(input("Enter a letter to guess: "))
			lettersGuessed += currentGuess
			bytesGuess = bytes(currentGuess, "utf-8")
			clientSocket.sendto(bytesGuess, (serverName, serverPort))
			modifiedMsg, server = clientSocket.recvfrom(2048)
			print(modifiedMsg)
			clientSocket.close()
		# guess is not the right argument type or is more than 1 letter
		except ValueError or len(currentGuess) > 1:
			print("Enter only one letter.")
			continue

		# other client-side guess validation
		if not currentGuess.isalpha():
			print("Only enter a letter")
			continue
		if currentGuess in lettersGuessed:
			print("You already guessed this letter. Try again.")
			continue

except KeyboardInterrupt:
	sys.exit("Game quit")
