# MAXX Decryption Scripts

This repo contains my work for the two cipher questions and the frequency analysis question in this [introduction CTF challenge](https://ctf.maxxpotential.com).

It's a little overkill to have all these deps for what I'm sure could be done in a Python script and maybe a bash thing, but it's fine.

I included the encoded target for the frequency analysis question in the Caesar cipher samples because unless the cipher was encoded in entirely randomized character -> character relationships, a simple Caesar shift was probably involved in encrypting it. Because it's easy.

So I started from there to see if there was anything remotely similar to English plaintext that I could start building they key from. Excuse the hasty code.
