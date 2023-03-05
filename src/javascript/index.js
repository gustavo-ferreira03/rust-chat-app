import { h, render } from 'https://cdn.skypack.dev/preact';
import { useState, useEffect } from 'https://cdn.skypack.dev/preact/hooks';
import htm from 'https://cdn.skypack.dev/htm';

const html = htm.bind(h);
const api = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

function App() {
    const [loggedUser, setLoggedUser] = useState();


    return html`
        ${
            loggedUser ?
            html`<${Chat} loggedUser=${{}} />` :
            html`<${Login} setLoggedUser=${setLoggedUser} />`
        }
    `
}

function Page({ children }) {
    return html`
        <main class="flex justify-center items-center fixed inset-0 bg-gray-700 text-slate-300">${children}</main>
    `
}

function Login({ setLoggedUser }) {
    const [username, setUsername] = useState("");

    function handleLogin(e) {
        e.preventDefault();
        console.log(username)
    }

    return html`
        <${Page}>
            <form class="flex flex-col justify-center items-center gap-5 h-full">
                <div class="flex flex-col gap-1">
                    <label for="username">Nome de usuário</label>
                    <input
                        class="bg-gray-600 h-5 p-5 rounded border border-transparent hover:border-slate-300 focus:outline-none transition"
                        placeholder="Username"
                        name="username"
                        autocomplete="off"
                        onchange=${e => setUsername(e.target.value)}
                    />
                </div>
                <button 
                    class="rounded p-2 w-1/2 bg-gray-600 hover:bg-slate-300 hover:text-gray-600 transition"
                    onclick=${e => handleLogin(e)}
                >Login</button>
            </form>
        </${Page}>
    `
}

function Chat({ loggedUser }) {
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
        <${Page}>
            <div class="flex gap-12 p-10">
                <section class="chat-sidebar">
                    <p>Usuários cadastrados</p>
                    <ul>${users}</ul>
                </section>
                <section class="flex flex-col gap-12 w-full">
                    <ul class="flex flex-col h-4/5">
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
                            onclick=${sendMessage}
                        ><i class="fa fa-paper-plane"/></button>
                    </form>
                </section>
            </div>
        </${Page}>
    `;
}

function Message({ message }) {
    return html`
        <li class="flex-col rounded gap-12 p-4 border-t border-slate-500 w-full hover:bg-gray-600 transition">
            <div class="flex items-center gap-2">
                <p class="font-bold">${message.author}</p>
                <p class="text-gray-500">Today at PM</p>
            </div>
            <pre>${message.text}</pre>
        </li>
    `;
}

render(html`<${App} />`, document.body)