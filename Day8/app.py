import pandas as pd
import streamlit as st 
from sentence_transformers import SentenceTransformer
df = pd.read_csv('anime_with_synopsis.csv')
model = SentenceTransformer("all-MiniLM-L6-v2")
df["real"] = df["sypnopsis"] + " " + "Genres : "+ df["Genres"] 
sentences1 = df["sypnopsis"]   
embeddings = model.encode(sentences1)
initial_bot_message = "Nhập mô tả anime mà bạn muốn xem "
def chatbot():
    if 'conversation_log' not in st.session_state:
        st.session_state.conversation_log = [
            {"role": "assistant", "content": initial_bot_message}
        ]

    # Nếu đã có lịch sử trò chuyện, hiển thị lịch sử ra màn hình
    for message in st.session_state.conversation_log:
        if message["role"] != "system":
            with st.chat_message(message["role"]):
                st.write(message["content"])
    if prompt := st.chat_input("nhập mô tả anime mà bạn muốn xe"): 
        sentences2 = [prompt]
        embeddings2 = model.encode(sentences2)
        similarities = model.similarity(embeddings, embeddings2)
        max = 0
        maxid = 0
        for idx_i, sentence1 in enumerate(sentences1):
            for idx_j, sentence2 in enumerate(sentences2):
                if max < (similarities[idx_i][idx_j]):
                    max = (similarities[idx_i][idx_j])
                    maxid = idx_i
        

        with st.chat_message("user"):
            st.write(prompt) 
        bot_reply = (df['Name'][maxid], ": ",df['real'][maxid]," ",max)

        with st.chat_message("assistant"):
            st.write(bot_reply)
        st.session_state.conversation_log.append({"role": "assistant", "content": bot_reply})
    



chatbot()

