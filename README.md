# Aprenda Gulp.js

## Aprenda sobre Gulp.js

- Official Website: [http://gulpjs.com](http://gulpjs.com)

### Instalação

- instalação do Gulp global

```shell
npm install -g gulp-cli
```

- instalação do Gulp local na pasta do projeto

```shell
npm install gulp --save-dev
```

### Sintaxe básica: gulpfile.js

```js
var gulp = require('gulp');

gulp.task('default', function () {

});
```

### Instalando plugins

1. Pesquisar em: [http://gulpjs.com/plugins/](http://gulpjs.com/plugins/)
1. Instalar plugin. ex: `npm install jshint gulp-jshint --save-dev`
1. Seguir instruções de uso do plugin.

### Conceitos

- .pipe()

- usar `return` nas tasks para torná-las assíncronas

### Recursos

- [Playlist - Grunt vs Gulp - Rodrigo Branas](https://www.youtube.com/playlist?list=PLQCmSnNFVYnTkUx1tVVPumohXVMDwfQcV)