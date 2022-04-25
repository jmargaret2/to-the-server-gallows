from socket import *
import sys

serverName = '140.103.93.138'  # put IP address
# serverName = '140.103.97.87'
serverPort = 13456
#

clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverName, serverPort))

lettersGuessed = ''
currentGuess = ''
numGuesses = 6
playAgain = False

try:
	while numGuesses != 0:
		try:
			numGuesses -= 1
			currentGuess = str(input("Enter a letter to guess: "))

			# Client-side guess validation
			if not currentGuess.isalpha():
				print("Enter only a letter")
				continue
			if currentGuess in lettersGuessed:
				print("You already guessed this letter. Try again.")
				continue

			lettersGuessed += currentGuess
			bytesGuess = bytes(currentGuess, "utf-8")
			clientSocket.sendto(bytesGuess, (serverName, serverPort))
			print("Sent message")
			modifiedMsg, server = clientSocket.recvfrom(2048)
		# guess is not the right argument type or is more than 1 letter
		except ValueError or len(currentGuess) > 1:
			print("Enter only one letter.")
			continue
	playStatus = str(input("Want to play again? Y/N"))
	if playStatus == 'Y':
		playAgain = True
		numGuesses = 6
	if playStatus == 'N':
		sys.exit("Game quit")

except KeyboardInterrupt:
	sys.exit("Game quit")

clientSocket.close()
