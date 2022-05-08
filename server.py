# Python webserver by Emily, Margaret, and Joe

# import modules needed for websockets, and connection to JavaScript file
import asyncio
import websockets

# initialize variables used for this hangman game
guessInProgress = ''
currentWord = ''
missedLetters = []
correctLetters = []
wonGame = False
foundAllLetters = False
number_of_guesses = 6


# create the asynchronous websocket
async def echo(websocket):
	global currentWord
	global wonGame
	global foundAllLetters
	global correctLetters
	global missedLetters
	global number_of_guesses
	async for message in websocket:
		# if message length is greater than 2, socket has received word for game
		if len(str(message)) > 2:
			currentWord = str(message)
			print("The word chosen was: " + currentWord)
		# from playAgain() function stating to restart game
		# message length is exactly 2 (phrase "rs") to signify to server to reset all values associated with game
		elif len(str(message)) == 2:
			number_of_guesses = 6
			correctLetters.clear()
			missedLetters.clear()
			wonGame = False
			currentWord = ''
			foundAllLetters = False
			print("successfully restarted game")
		# this message is each letter guess
		# message length is exactly 1, to account for only 1 guess at a time
		elif len(str(message)) == 1:
			number_of_guesses = 6
			letter_guess = str(message)
			letter_guess = letter_guess.lower()
			print("The guessed letter is " + letter_guess)
			letterIndex = currentWord.find(letter_guess)
			print("letterIndex is: " + str(letterIndex))

			# guessed letter is in the word, then the index of the found letter is sent to JavaScript file
			if letterIndex != -1:
				print("LETTER IS IN WORD")
				correctLetters.append(letter_guess)
				await websocket.send(str(letterIndex))

			# guessed letter is not in the word, index of -1 is sent to JavaScript file
			if letterIndex == -1:
				print("LETTER NOT IN WORD")
				missedLetters.append(letter_guess)
				number_of_guesses = number_of_guesses - 1
				await websocket.send(str(letterIndex))

			# user has run out of guesses, this string is sent to JavaScript file
			if number_of_guesses == 0:
				await websocket.send("no more guesses")

			# loop determines if all the letters in the word have been found yet
			for letter in range(len(currentWord)):
				# not all letters found - user has not won game yet
				if currentWord[letter] not in correctLetters:
					foundAllLetters = False
					break
				# user has won game, as all letters have been found
				else:
					foundAllLetters = True

			# all letters have been found, so user has won game, this string is sent to JavaScript file
			if foundAllLetters:
				wonGame = True
				await websocket.send("win")

			print("The correct letters so far are: ", correctLetters)


# main function of async websocket, which will run forever until manually stopped
async def main():
	async with websockets.serve(echo, "localhost", 8080):
		await asyncio.Future()  # run forever


asyncio.run(main())
