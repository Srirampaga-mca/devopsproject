#!/bin/sh
# This script will run commands and then start the server

# These commands will now run
echo "--- Listing files in the current directory ---"
ls -l
echo "--- Showing current directory ---"
pwd

# This last command starts your application
# 'exec' is used to make the node process the main process (PID 1)
