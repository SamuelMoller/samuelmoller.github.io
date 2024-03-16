// =====================================================================================================
// Samuel Möller, 2024
// 
// =====================================================================================================

export class Homepage {
    constructor() {
        this.initHero();
    }

// =====================================================================================================
    initHero() {
        let self = this;
        let lipsum = "<p>Gravida dapibus netus nunc integer mauris. Semper quisque primis mi penatibus eros pulvinar lorem ultrices. Natoque sociosqu ipsum a amet dolor morbi. Per mus lectus magnis felis nostra fames risus mollis risus amet montes. Urna curae; torquent hendrerit ornare sed venenatis primis. Dictum fusce feugiat fermentum. Mauris lectus congue consequat tempor nascetur, nam.</p><p>Cursus arcu ultrices est habitant tristique lorem habitant in commodo morbi taciti. Vitae bibendum parturient pharetra commodo, vestibulum quisque. Commodo quisque nec augue! Leo, nisi lectus etiam vehicula. Nam molestie euismod pretium ullamcorper nam. Ornare maecenas cras hac! Odio luctus bibendum parturient luctus sed accumsan consequat erat. Quam nullam dictum, litora per class cras metus ultricies sit. Id lorem inceptos.</p><p>Ad augue parturient magnis fermentum? Dignissim leo facilisis ad massa fringilla porttitor senectus fames rhoncus! Nunc bibendum aptent massa primis volutpat laoreet ornare odio est facilisi. Et nullam in a neque et iaculis suscipit convallis sagittis aptent donec hendrerit? Aliquet litora ultricies consequat. Quisque facilisis sit orci arcu scelerisque tincidunt litora malesuada quisque?</p><p>Primis massa aliquet sed blandit tristique tortor. Condimentum mollis rhoncus ornare, erat senectus risus nibh vivamus montes faucibus urna elementum! Quam suscipit lectus massa suspendisse iaculis convallis primis, tortor aliquam. Maecenas nisi ut gravida sit ipsum tempus, risus cubilia metus. A sed pellentesque quam quam rutrum. Senectus faucibus dictum risus aenean. Iaculis torquent platea commodo nostra. Lobortis per ligula arcu eleifend aliquam tempor feugiat aptent nulla. Massa aptent convallis aptent vel conubia. Morbi sapien per donec sollicitudin aliquam placerat augue, ante molestie.</p><p>Eu a venenatis platea id ac. Pulvinar quisque, euismod convallis at aptent congue leo montes habitant pharetra est semper. Praesent curae; diam aliquam dolor arcu turpis aptent dapibus. Purus primis iaculis eleifend sodales scelerisque pulvinar erat mollis tortor semper. Habitant est nisl dis ullamcorper! Eget magnis phasellus platea nec est? Sem ac id a enim.</p>";
        $("main").append("<div id='homepageContent'></div>");
        $("#homepageContent").append("<img id='hero-img' src='res/img/cartoon-ships.jpg'>");
    }
}