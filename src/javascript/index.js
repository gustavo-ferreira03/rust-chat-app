import { h, render } from 'https://cdn.skypack.dev/preact';
import { useState, useEffect } from 'https://cdn.skypack.dev/preact/hooks';
import htm from 'https://cdn.skypack.dev/htm';

const html = htm.bind(h);
const api = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json",
    },
});

function App() {
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("users")
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
        api.get("messages")
            .then(res => setMessages(res.data))
            .catch(err => console.error(err));
    }, [])

    function sendMessage(e) {
        e.preventDefault();
        api.post("messages", {
            user_id: 1,
            text: msg,
        });
    }

    return html`
        <main class="fixed inset-0 bg-gray-700 text-slate-300">
            <div class="flex gap-12 p-10">
                <section class="chat-sidebar">
                    <p>Usuários cadastrados</p>
                    <ul>${users}</ul>
                </section>
                <section class="flex flex-col gap-12 w-full">
                    <ul class="flex flex-col overflow-y-auto h-140">
                        ${messages.map((message) => html`<${Message} message=${message} />`)}
                    </ul>
                    <form class="flex justify-between gap-5 py-2 px-4 border rounded border-slate-500 w-full bg-gray-600">
                        <input
                            class="bg-inherit w-full focus:outline-none"
                            placeholder="Message"
                            name="msg-text"
                            autocomplete="off"
                            onchange=${(e) => setMsg(e.target.value)}
                        />
                        <button 
                            class=""
                            onclick=${sendMessage}
                        ><i class="fa fa-paper-plane"/></button>
                    </form>
                </section>
            </div>
        </main>
    `;
}

function Message({ message }) {
    return html`
        <li class="flex-col rounded gap-12 p-4 border-t border-slate-500 w-full hover:bg-gray-600 transition">
            <p><b>user_id:</b> ${message.user_id}</p>
            <pre>${message.text}</pre>
        </li>
    `;
}

render(html`<${App} />`, document.body)