import { h, Component, render } from 'https://unpkg.com/preact?module';
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(h);

function App() {
    const [msg, setMsg] = 

    function sendMessage(e) {
        e.preventDefault();
        console.log(msg);
    }

    return html`
        <main>
            <div class="chat-container">
                <section class="chat-sidebar">
                    <p>Usuários cadastrados</p>
                    <ul></ul>
                </section>
                <section class="chat-content">
                    <ul></ul>
                    <form class="message-form">
                        <input name="msg-text" onchange=${(e) => msg = e.target.value}/>
                        <button onclick=${sendMessage} class="btn btn-send">Send</button>
                    </form>
                </section>
            </div>
        </main>
    `;
}

render(html`<${App} />`, document.body)