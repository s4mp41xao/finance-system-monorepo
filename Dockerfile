### ESTÁGIO 1: Build (Construção) ###
FROM node:18 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# !! IMPORTANTE: Substitua 'seu-projeto-angular' pelo nome do seu projeto em angular.json !!
RUN npm run build -- --configuration production

### ESTÁGIO 2: Serve (Servidor) ###
FROM nginx:alpine

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# !! IMPORTANTE: Substitua 'seu-projeto-angular' pelo nome do seu projeto !!
COPY --from=builder /app/dist/angular-finance-crud/ /usr/share/nginx/html
