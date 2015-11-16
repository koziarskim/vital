package com.vital.web.service;

import com.vital.web.domain.DailyNote;
import com.vital.web.repository.DailyNoteRepository;
import com.vital.web.service.exception.UserAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@Service
@Validated
@Transactional(readOnly = true)
public class DailyNoteServiceImpl implements DailyNoteService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DailyNoteServiceImpl.class);
    private final DailyNoteRepository repository;

    @Inject
    public DailyNoteServiceImpl(final DailyNoteRepository repository) {
        this.repository = repository;
    }

    @Inject
    @Qualifier("primaryJdbcTemplate")
    protected JdbcTemplate jdbc;

    @Transactional(readOnly = false)
    public DailyNote create(@NotNull @Valid final DailyNote note) {
        LOGGER.debug("Creating {}", note);
        DailyNote existing = repository.findOne(note.getId());
        if (existing != null) {
            throw new UserAlreadyExistsException(
                    String.format("There already exists a DailyNote with id=%s", note.getId()));
        }
        return repository.save(note);
    }

    public List<DailyNote> findAll() {
        LOGGER.debug("Retrieving the list of all DailyNote");
        return repository.findAll();
    }

    public DailyNote getById(String id) {
        jdbc.queryForList("SELECT * FROM PUBLIC.DAILY_NOTE WHERE id=?",id);
        return repository.findOne(id);
    }

}
