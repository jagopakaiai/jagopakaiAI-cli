FROM node:18-alpine

WORKDIR /app

# Copy compiled dist
COPY dist/ ./dist/
COPY package.json .

# Create demo entrypoint
COPY sandbox/demo.sh /usr/local/bin/sandbox-demo
RUN chmod +x /usr/local/bin/sandbox-demo

ENTRYPOINT ["node", "dist/index.js"]
CMD ["--help"]
