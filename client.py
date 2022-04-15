# from socket import *
#
# serverName = 'xxx.xxx.xxx.xxx'  # put IP address
# serverPort = 12000
#
# clientSocket = socket(AF_INET, SOCK_DGRAM)
#
# mssg = raw_input('Input lowercase sentence: ')
#
# clientSocket.sendto(mssg, (serverName, serverPort))
#
# # Set up a new connection from the client
# modifiedMessg, server = clientSocket.recvfrom(2048)
#
# print(modifiedMessg)
#
# clientSocket.close()
