import asyncio
import websockets

guessInProgress = ''
currentWord = ''
missedLetters = []
correctLetters = []
wonGame = False
foundAllLetters = False
number_of_guesses = 6


async def echo(websocket):
	global currentWord
	global wonGame
	global foundAllLetters
	global correctLetters
	global missedLetters
	global number_of_guesses
	async for message in websocket:
		if len(str(message)) > 2:
			currentWord = str(message)
			print("The word chosen was: " + currentWord)
		# from playAgain() function stating to restart game
		elif len(str(message)) == 2:
			number_of_guesses = 6
			correctLetters.clear()
			missedLetters.clear()
			wonGame = False
			currentWord = ''
			foundAllLetters = False
			print("successfully restarted game")
		# this message is each letter guess
		elif len(str(message)) == 1:
			number_of_guesses = 6
			letter_guess = str(message)
			letter_guess = letter_guess.lower()
			print("The guessed letter is " + letter_guess)
			letterIndex = currentWord.find(letter_guess)
			print("letterIndex is: " + str(letterIndex))

			if letterIndex != -1:
				print("LETTER IS IN WORD")
				correctLetters.append(letter_guess)
				await websocket.send(str(letterIndex))
			if letterIndex == -1:
				print("LETTER NOT IN WORD")
				missedLetters.append(letter_guess)
				number_of_guesses = number_of_guesses - 1
				await websocket.send(str(letterIndex))

			if number_of_guesses == 0:
				await websocket.send("no more guesses")

			for letter in range(len(currentWord)):
				# not all letters found
				if currentWord[letter] not in correctLetters:
					foundAllLetters = False
					break
				else:
					foundAllLetters = True

			if foundAllLetters:
				wonGame = True
				await websocket.send("win")

			print("The correct letters so far are: ", correctLetters)


async def main():
	async with websockets.serve(echo, "localhost", 8080):
		await asyncio.Future()  # run forever


asyncio.run(main())
