# imports
import pandas as pd
import pickle
import psycopg2

import sys

import openai as openai
from openai.embeddings_utils import (
    get_embedding,
    distances_from_embeddings,
    tsne_components_from_embeddings,
    chart_from_components,
    indices_of_nearest_neighbors_from_distances,
)

# constants
EMBEDDING_MODEL = "text-embedding-ada-002"
with open(".env") as f:
    key = f.read().split("=")[1].replace("\n", "")
    openai.api_key = key

FILE = "test"

# load data
# dataset_path = f"data/{FILE}.csv"
# df = pd.read_csv(dataset_path, delimiter="#")

# establish a cache of embeddings to avoid recomputing
# cache is a dict of tuples (text, model) -> embedding, saved as a pickle file

# set path to embedding cache
embedding_cache_path = f"cache/{FILE}.pkl"

# load the cache if it exists, and save a copy to disk
try:
    embedding_cache = pd.read_pickle(embedding_cache_path)
except FileNotFoundError:
    embedding_cache = {}
with open(embedding_cache_path, "wb") as embedding_cache_file:
    pickle.dump(embedding_cache, embedding_cache_file)


# define a function to retrieve embeddings from the cache if present, and otherwise request via the API
def embedding_from_string(
    string: str, model: str = EMBEDDING_MODEL, embedding_cache=embedding_cache
) -> list:
    """Return embedding of given string, using a cache to avoid recomputing."""
    if (string, model) not in embedding_cache.keys():
        embedding_cache[(string, model)] = get_embedding(string, model)
        with open(embedding_cache_path, "wb") as embedding_cache_file:
            pickle.dump(embedding_cache, embedding_cache_file)
    return embedding_cache[(string, model)]


# as an example, take the first description from the dataset
# example_string = "duya123"
# print(f"\nExample string: {example_string}")

# print the first 10 dimensions of the embedding
# z1 = embedding_from_string(example_string)
# zall = pd.DataFrame([embedding_from_string(df["description"][0]), embedding_from_string(df["description"][1])])
#
# with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
#     print(zall)
#
# print(f"\nz1: {z1}...")
# print(f"\nzall: {zall}...")
# zall.to_csv('zall')
#
# print("dot: ", zall.dot(z1))


def print_recommendations_from_strings(
    strings,
    index_of_source_string: int,
    k_nearest_neighbors: int = 1,
    model=EMBEDDING_MODEL,
):
    """Print out the k nearest neighbors of a given string."""
    # get embeddings for all strings
    embeddings = [embedding_from_string(string, model=model) for string in strings]
    print(f"Embeddings: {[e[:4] for e in embeddings]}")

    # get the embedding of the source string
    # query_embedding = embeddings[index_of_source_string]
    # get distances between the source embedding and other embeddings (function from embeddings_utils.py)
    # distances = distances_from_embeddings(query_embedding, embeddings, distance_metric="cosine")
    # get indices of nearest neighbors (function from embeddings_utils.py)
    # indices_of_nearest_neighbors = indices_of_nearest_neighbors_from_distances(distances)

    # print out source string
    # query_string = strings[index_of_source_string]
    # print(f"Source string: {query_string}")
    # # print out its k nearest neighbors
    # k_counter = 0
    # for i in indices_of_nearest_neighbors:
    #     # skip any strings that are identical matches to the starting string
    #     if query_string == strings[i]:
    #         continue
    #     # stop after printing out k articles
    #     if k_counter >= k_nearest_neighbors:
    #         break
    #     k_counter += 1
    #
    #     # print out the similar strings and their distances
    #     print(
    #         f"""
    #     --- Recommendation #{k_counter} (nearest neighbor {k_counter} of {k_nearest_neighbors}) ---
    #     String: {strings[i]}
    #     Distance: {distances[i]:0.3f}"""
    #     )

    # return indices_of_nearest_neighbors


conn = psycopg2.connect(
    database="hackyeah",
    user="u1",
    password="2oxREaU8tmqUANruiQDS62tWJtsBPYW82xsfgY6w",
    host="192.168.72.190",
    port="5432",
)
cursor = conn.cursor()


def update_one(id):
    try:
        qs = f"SELECT description FROM studia_zwykle WHERE id = {id}"
        cursor.execute(qs)
        desc = cursor.fetchone()[0]

        print(id, desc)
        if desc is None:
            return

        vec = embedding_from_string(desc)

        qu = (
            "UPDATE studia_zwykle SET vector = ('{"
            + ", ".join([str(i) for i in vec])
            + "}') WHERE id = "
            + str(id)
        )
        cursor.execute(qu)
        conn.commit()
    except:
        print()


def from_to(start, end):
    for i in range(start, end):
        update_one(i)


fr = int(sys.argv[1])
to = fr + 200
# fr = 4171
# to = 6255
print(fr, to)
from_to(fr, to)

conn.close()

# article_descriptions = df["description"].tolist()
#
# print_recommendations_from_strings(
#     strings=article_descriptions,  # let's base similarity off of the article description
#     index_of_source_string=0,  # let's look at articles similar to the first one about Tony Blair
#     k_nearest_neighbors=5,  # let's look at the 5 most similar articles
# )
