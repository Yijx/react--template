#!/bin/bash
echo -e "\033[42;37m start git push \033[0m"
git add -A
echo -e "\033[42;37m git add completed! \033[0m"
echo -e "\033[42;37m start git commit... \033[0m"
npm run commit
echo -e "\033[42;37m git commit completed! \033[0m"
echo -e "\033[42;37m git push to default branch(yangjiaxun)... \033[0m"
git push
echo -e "\033[42;37m git push to dev branch(yangjiaxun→dev)... \033[0m"
git push origin yangjiaxun:dev
echo -e "\033[42;37m completed! \033[0m"