import { ImageSource, Sound, Resource, Loader } from 'excalibur'



const Resources = {
    Background: new ImageSource('images/Cartoon_Forest_BG_04.png'),

    Player_Running: new ImageSource('images/Player_Running.png'),
    Player_Jumping: new ImageSource('images/Player_Jumping.png'),

    Spike: new ImageSource("images/Spike.png"),
    Block: new ImageSource("images/Block.png"),
    Spike_Block: new ImageSource("Spike_Block.png")

}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }