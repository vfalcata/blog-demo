# Specify base image
FROM node:alpine
# {NAME_OF_REPO}:{TAG_NAME}

#for react app
ENV CI=true

#Sets the working directory in the container, all following commands will be issued relative to this dir
WORKDIR /usr/app

#Copies ONLY the package.json file
COPY ./package.json ./
# COPY {LOCAL_DIR} {CONTAINER_DIR}

# Install dependencies
RUN npm install

#Copy the rest of the files
COPY ./ ./

#set the command to run when the container starts up
# Default commands
CMD ["npm","start"]


