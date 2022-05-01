from socket import *

serverName = 'localhost' # put IP address
serverPort = 13456

clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverName, serverPort))

lettersGuessed = ''
currentGuess = ''
numGuesses = 6
playAgain = False

while True:
	currentGuess = str(input("Enter a letter to guess: "))

	# Client-side guess validation
	if not currentGuess.isalpha():
		print("Enter only a letter")
		continue
	if currentGuess in lettersGuessed:
		print("You already guessed this letter. Try again.")
		continue
	if len(currentGuess) > 1:
		print("You have too many letters.")

	lettersGuessed += currentGuess
	clientSocket.send(bytes(currentGuess, "utf-8"))
	letterMsg = clientSocket.recv(1024).decode("utf-8")
	print("How many guesses left? " + str(letterMsg))

	if str(letterMsg) == 0:
		print("LOSE GAME")
		clientSocket.close()
		break

clientSocket.close()
