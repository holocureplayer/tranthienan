import streamlit as st
import pandas as pd
df = pd.read_csv('anime_with_synopsis.csv')
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")



df["real"] = df["sypnopsis"] +"Genres: "+ df["Genres"]


sentences1 = df["real"].head(1000)

embeddings1 = model.encode(df["real"].head(1000))
initial_bot_message =  "Xin chào! Bạn cần hỗ trợ gì?"
def restaurant_chatbot():
    st.title("Restaurant Assistant Chatbot")
    sentences2 = []

    if 'conversation_log' not in st.session_state:
        st.session_state.conversation_log = [
            {"role": "assistant", "content": initial_bot_message}
        ]


    for message in st.session_state.conversation_log:
        if message["role"] != "system":
            with st.chat_message(message["role"]):
                st.write(message["content"])

    if prompt := st.chat_input("Nhập yêu cầu của bạn tại đây..."):
        with st.chat_message("user"):
            st.write(prompt)
            sentences2 = [prompt]
        st.session_state.conversation_log.append({"role": "user", "content": prompt})
        embeddings2 = model.encode(sentences2)
        similarities = model.similarity(embeddings1, embeddings2)
        maxs = 0
        maxid = 0
        for idx_i, sentence1 in enumerate(sentences1):
            for idx_j, sentence2 in enumerate(sentences2):
                if(maxs < similarities[idx_i][idx_j]):
                    maxid = idx_i
                    maxs = similarities[idx_i][idx_j]
        bot_reply = "Name :"+ df["Name"][maxid]) + " " df["sypnopsis"][maxid] + " " + df["Genres"][maxid]
        with st.chat_message("assistant"):
            st.write("Name :"+ df["Name"][maxid])
            st.write(df["sypnopsis"][maxid])
            st.write("Genres: "+ df["Genres"][maxid])
            
            st.session_state.conversation_log.append({"role": "assistant", "content": bot_reply})


        
    

restaurant_chatbot()


