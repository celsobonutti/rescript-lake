mod utils;

use palmer::audio::AudioDriver;
use palmer::input::Button;
use palmer::Chip8;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

pub struct WebAudioDriver {}

impl palmer::audio::AudioDriver for WebAudioDriver {
    fn new() -> Self {
        Self {}
    }

    fn play_sound(&mut self) {}
}

#[wasm_bindgen]
pub struct Emulator {
    emulator: Chip8<WebAudioDriver>,
}

fn parse_key(key: char) -> Option<Button> {
    match key {
        '1' => Some(Button::One),
        '2' => Some(Button::Two),
        '3' => Some(Button::Three),
        '4' => Some(Button::C),
        'Q' | 'q' => Some(Button::Four),
        'W' | 'w' => Some(Button::Five),
        'E' | 'e' => Some(Button::Six),
        'R' | 'r' => Some(Button::D),
        'A' | 'a' => Some(Button::Seven),
        'S' | 's' => Some(Button::Eight),
        'D' | 'd' => Some(Button::Nine),
        'F' | 'f' => Some(Button::E),
        'Z' | 'z' => Some(Button::A),
        'X' | 'x' => Some(Button::Zero),
        'C' | 'c' => Some(Button::B),
        'V' | 'v' => Some(Button::F),
        _ => None,
    }
}

#[wasm_bindgen]
impl Emulator {
    #[wasm_bindgen]
    pub fn load(&mut self, buffer: Vec<u8>) {
        self.emulator.load(buffer);
    }

    #[wasm_bindgen(getter)]
    pub fn screen(&self) -> Box<[u8]> {
        self.emulator
            .display
            .pixels
            .iter()
            .map(|bool| if *bool { 1 } else { 0 })
            .collect::<Vec<u8>>()
            .into_boxed_slice()
    }

    #[wasm_bindgen]
    pub fn press_button(&mut self, button: char) {
        let button = parse_key(button);

        if let Some(key) = button {
            self.emulator.input.key_down(key);
        }
    }

    #[wasm_bindgen]
    pub fn release_button(&mut self, button: char) {
        let button = parse_key(button);

        if let Some(key) = button {
            self.emulator.input.key_up(key);
        }
    }

    #[wasm_bindgen]
    pub fn emulate_cycle(&mut self) {
        self.emulator.emulate_cycle();
    }
}

#[wasm_bindgen]
pub fn start_emulator() -> Emulator {
    let chip = Chip8::new(WebAudioDriver::new());
    Emulator { emulator: chip }
}
