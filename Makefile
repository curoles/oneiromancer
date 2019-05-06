SRC ?= .
PROLOG_SRC := feelings.pl

facts: $(addprefix $(SRC)/db/prolog/,$(PROLOG_SRC))
	gplc $^ -o $@
