import asyncio
import websockets

guessInProgress = ''
currentWord = ''
missedLetters = []
correctLetters = []
wonGame = False
messageIterations = 0


async def echo(websocket):
	global currentWord
	global messageIterations
	async for message in websocket:
		if messageIterations == 0:
			currentWord = str(message)
			print("The word chosen was: " + currentWord)
			messageIterations = messageIterations + 1

		# this message is each letter guess
		else:
			number_of_guesses = 6
			letter_guess = str(message)
			letter_guess = letter_guess.lower()
			print("The guessed letter is " + letter_guess)
			letterIndex = currentWord.find(letter_guess)

			if letterIndex != -1:
				print("LETTER IS IN WORD")
				correctLetters.append(letter_guess)
				await websocket.send("word")
			if letterIndex == -1:
				print("LETTER NOT IN WORD")
				missedLetters.append(letter_guess)
				number_of_guesses = number_of_guesses - 1
				await websocket.send("no word")

			if number_of_guesses == 0:
				await websocket.send("no guesses")

			for letter in range(len(currentWord)):
				if currentWord[letter] not in correctLetters:
					wonGame = False
					break
				else:
					wonGame = True

			print("The correct letters so far are: ", correctLetters)
			messageIterations = messageIterations + 1


async def main():
	async with websockets.serve(echo, "localhost", 13456):
		await asyncio.Future()  # run forever


asyncio.run(main())
