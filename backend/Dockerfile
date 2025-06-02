# 1) 베이스 이미지 지정 (Node 버전은 필요에 맞게)
FROM node:20-alpine

# 2) 작업 디렉토리 생성 및 설정
WORKDIR /usr/src/app

# 3) package.json과 package-lock.json 복사 (의존성만 미리 설치하도록)
COPY package*.json ./

# 4) 의존성 설치
RUN npm ci --only=production

# 5) 소스 코드 복사
COPY . .

# 6) (TypeScript 프로젝트라면) 빌드 실행
RUN npm run build

# 7) 컨테이너가 실행될 포트(예: NestJS 기본 3000)
EXPOSE 3001

# 8) 애플리케이션 실행 명령
CMD ['node', 'dist/main.js']
