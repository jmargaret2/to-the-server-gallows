from socket import *

serverSocket = socket(AF_INET, SOCK_STREAM)

serverPort = 12000
serverSocket.bind(('', serverPort))
serverSocket.listen(1)
print('The server is ready to receive')

numberOfGuesses = 6
possibleWords = ["cat", "dog", "fish"]
currentWord = random.choice(possibleWords)

while True:
    # Establish the connection
    print('Ready to serve...')
    connectionSocket, addr = serverSocket.accept()

    try:
        letterGuess = connectionSocket.recv(1024)

		if letterGuess in currentWord:
    		print( "LETTER IS IN WORD")
			# SHOW LETTER ON SCREEN HERE

		if letterGuess not in currentWord:
    		print("LETTER IS NOT IN WORD")
			numberOfGuesses--


        # Close client socket
        connectionSocket.close()
