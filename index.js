const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";    

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '??도움말 을 입력해보세요' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.content === '??심심하다') {
    message.reply('https://www.youtube.com/channel/UCTgdj1HMrJCYbEp0wSDS32A/playlists?view_as=subscriber');
  }
});

client.on('message', (message) => {
    if(message.content === '??심심일상') {
      message.reply('https://www.youtube.com/watch?v=sogmqxpR6ro&list=PLYw21Sww93KUrUsFZ4duFctIpvcU5HYNE');
    }
  });

client.on('message', (message) => {
    if(message.content === '??게임') {
      message.reply('https://www.youtube.com/watch?v=j-r06vcbhn8&list=PLYw21Sww93KUVTG2kcVVMAC1Xa9qCTfdW');
    }
  });
  
client.on('message', (message) => {
    if(message.content === '??라이브') {
      message.reply('https://www.youtube.com/watch?v=tDN_sLNc5Ok&list=PLYw21Sww93KVWE6QxaR2yoVt5hK1SMJIW');
    }
  });

client.on('message', (message) => {
    if(message.content === '??리믹스') {
      message.reply('https://www.youtube.com/watch?v=F4ZgubvBGM8&list=PLYw21Sww93KWoamwVHXbULO6SZagSpjiY');
    }
  });

client.on('message', (message) => {
    if(message.content === '??편집연습') {
      message.reply('https://www.youtube.com/watch?v=a_IcsknNel4&list=PLYw21Sww93KWqDpOIAb6noxs1WaOGhfqg');
    }
  });
client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('fuck');
  }

  if(message.content == '??도움말') {
    let img = 'https://ifh.cc/g/KfONEw.png';
    let embed = new Discord.RichEmbed()
      .setTitle('봇 명령어 도움말')
      .setURL('https://ifh.cc/g/KfONEw.png')
      .setAuthor('성우코인 분석기', img, '')
      .setThumbnail(img)
      .addBlankField()
      .addField('??심심하다', '--심심하다 유튜브로 이동합니다.--')
      .addField('??인사말', '--인사말을 보여줍니다.--')
      .addField('??심심일상', '--심심일상 재생목록으로 이동합니다.--')
      .addField('??게임', '--게임 재생목록으로 이동합니다.--')
      .addField('??라이브', '--가끔씩 키는 라이브 재생목록으로 이동합니다.--')
      .addField('??리믹스', '--리믹스 재생목록으로 이동합니다.--')
      .addField('??편집연습', '--편집연습 재생목록으로 이동합니다.--')
      .addField('??공지', '--공지창으로 이동합니다.--')
      .addBlankField()
      .setTimestamp()
      .setFooter('성우코인 분석기', img)

    message.channel.send(embed)  
  } 

  if(message.content == '??인사말') {
    let img = 'https://ifh.cc/g/KfONEw.png';
    let embed = new Discord.RichEmbed()
      .setTitle('심심하다')
      .setURL('http://www.naver.com')
      .setAuthor('성우코인 분석기', img, '')
      .setThumbnail(img)
      .addBlankField()
      .addField('인사말', '안녕하세요. 유튜브 홍보 목적으로 디스코드 봇을 만들게 되었습니다. 앞으로도 많이많이 시청해주시고 더욱 더 재미있는 영상으로 찾아뵙겠습니다.^^\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('랏되 봇 메이커', img)

    message.channel.send(embed)  
  }
  if(message.content == '??공지') {
    let img = 'https://ifh.cc/g/KfONEw.png';
    let embed = new Discord.RichEmbed()
      .setTitle('공지')
      .setURL('http://www.naver.com')
      .setAuthor('성우코인 분석기', img, '')
      .setThumbnail(img)
      .addBlankField()
      .addField('공지사항', '추가 공지사항 없음')
      .addBlankField()
      .setTimestamp()
      .setFooter('랏되 봇 메이커', img)

    message.channel.send(embed)   
  }



  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);